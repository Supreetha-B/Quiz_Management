export interface registerPostData {
    firstName:string;
    mail:string;
    pwd:string;

}
export interface Users extends registerPostData{
    id:string
}