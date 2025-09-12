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
    username?: string;
    bio?: string;
    phone?: number;
    location?: string;
    country?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type Post = {
    text: string;
    images: string[];
    mentions: string[];
    tags: string[];
}

export type PostRes = {
    _id: string;
    text: string;
    images: string[];
    mentions: string[];
    tags: string[];
    userId: string;
    user?: User;
    reactionsCount: number;
    commentsCount: number;
    createdAt?: string;
    updatedAt?: string;
};

export type Reaction = {
    userId: string;
    postId: string;
    type: string;
    createdAt?: string;
    updatedAt?: string;
};

export type Comment = {
    userId: string;
    postId: string;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
};