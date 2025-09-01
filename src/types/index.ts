export type Auth = {
    email: string;
    password: string;
    name: string;
    image: string;
}

export type User = {
    email: string;
    password: string;
    name: string;
    image: string;
    bio?: string;
    isOnline?: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export type Post = {
    title: string;
    description: string;
    attachments: string[];
    author: User;
    createdAt?: string;
    updatedAt?: string;
};

export type Comment = {
    id: number;
    postId: number;
    author: User;
    content: string;
    createdAt?: string;
    updatedAt?: string;
};