
// APIから取得する掲示板
export interface Forum {
    forum_id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

// APIから取得する掲示板一覧
export interface Forums {
    forums: Forum[];
}

// APIに設定する掲示板作成パラメータ
export interface ForumAdd {
    title: string;
    content: string;
}

// APIから取得するコメント
export interface Comment {
    forum_id: number;
    comment_id: number;
    comment: string;
    created_at: string;
    updated_at: string;
}

// APIから取得するコメント一覧
export interface Comments {
    comments: Comment[];
}

// APIに設定するコメント作成パラメータ
export interface CommentAdd {
    comment: string;
}