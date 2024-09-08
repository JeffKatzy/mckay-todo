export type ActionState = {
    status: "idle" | "loading" | "success" | "error";
    message: string;
    data?: any;
}