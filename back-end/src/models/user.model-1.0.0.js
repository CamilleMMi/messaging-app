const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const envConfiguration = require('../configurations/env.configuration-1.0.0');

const { jwt_key } = envConfiguration;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email required"],
            unique: true,
            trim: true,
            lowercase: true,
            validate(v) {
                if (!validator.isEmail(v)) {
                    throw new Error(`The email must be valid`);
                }
            }
        },
        password: {
            type: String,
            required: [true, "Password required"],
            validate(v) {
                if (!validator.isLength(v, { min: 8 })) {
                    throw new Error(`The password must be between 8 and 20 characters`);
                }
            }
        },
        role: {
            type: String,
            required: [true, "Role required"],
            enum: ['user'],
            default: 'user'
        },
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        nickName: {
            type: String,
            required: true,
            unique: true,
            required: false
        },
        profilePic: {
            type: String,
            default: "",
            required: false
        },
        profileSetup: {
            type: Boolean,
            default: false,
            required: false
        },
        authTokens: [{
            _id: false,
            authToken: {
                type: String,
                required: true
            }
        }]
    },

    {
        timestamps: true
    }
);

userSchema.methods.toJSON = function() {
    const user = this.toObject();

    delete user.password;
    delete user.profileSetup;
    delete user.authTokens;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;

    return user;
}

userSchema.methods.generateAuthTokenAndSaveUser = async function() {
    const authToken = jwt.sign({ _id: this._id.toString() }, jwt_key, { expiresIn: '12h' });
    const options = { validateBeforeSave: false };
    
    this.authTokens.push({ authToken });

    await this.save(options);

    return authToken;
}

userSchema.statics.login = async(email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Login or password incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Login or password incorrect');
    }

    return user;
}

userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hashSync(this.password, 12);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;