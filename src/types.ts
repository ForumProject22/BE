interface Users {
    firstName: string;
    lastName: string;


    role: number;
    email: string;

    verifiedPass: boolean;
    password: string;


    timestamps: boolean;

    matchPassword(enteredPassword: string): Promise<Boolean>
}
interface Users2 {
    firstName: string;
    lastName: string;
    displayName: string;
    dob: string;
    role: number;
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

interface jwtTypes {

    email: string;
    iat: number;
    exp: number;

}


