export class User
{
    private username:string;
    private email:string;
    private number:string;

    public User(username:string, email:string, number:string)
    {
        this.username = username;
        this.email = email;
        this.number = number;
    }
}