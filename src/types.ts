interface Users {
    firstName: string;
    lastName: string;
    displayName: string;
    dob: string;
    role: [];
    email: string;
    verified: boolean;
    verifiedPass: boolean;
    password: string;
    roles: number;
    avatar: string;
    followers: [];
    followings: [];
    city: string;
    state: string;
    socialMedia: [
        {
            twitter: string;
            facebook: string;
            instagram: string;

        }

    ];
    timestamps: boolean;

    matchPassword(enteredPassword: string): Promise<Boolean>
}