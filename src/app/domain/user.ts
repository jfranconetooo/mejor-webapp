export class User {
        constructor(
            public _id:string,
            public instagramId: string,
            public username: string,
            public profile_picture: string,
            public full_name: String = null,
            public birth_date: string = null,
            public city: String = null,
            public education: String = null,
            public occupation: String = null,
            public email: String = null
        ) { }   
 
        toJson() {
            return {
                id: this._id,
                instagramId: this.instagramId,
                username: this.username,
                profile_picture: this.profile_picture,
                full_name: this.full_name,
                birth_date: this.full_name,
                city: this.city,
                education: this.education,
                occupation: this.occupation,
                email: this.email
            }
        }

        static fromJson(obj){
            return new User(
                obj._id,
                obj.instagramId,
                obj.username,
                obj.profile_picture,
                obj.full_name,
                obj.birth_date,
                obj.city,
                obj.education,
                obj.occupation,
                obj.email
            );
        }
    }