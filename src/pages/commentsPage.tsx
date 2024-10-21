import React, { useEffect, useState } from 'react';
import Card from '../components/ui/card';
import { H4, Span } from '../components/tags/textTags';
import { Div } from '../components/tags/containerTags';
import { getItem } from '../apis/hackerNewsApi';
import { Link, useLocation, useParams } from 'react-router-dom';
import CommentCard from '../components/ui/commentCard';
import { formatRelative } from 'date-fns/fp';
import { subDays } from 'date-fns';

interface Item {
    id: number;
    title: string;
    url: string;
    time: number;
    score: number;
    deleted: boolean;
    type: "job" | "comment" | "comment" | "poll" | "pollopt"
    by: string;
    text: string;
    dead: boolean;
    parent: number;
    poll: string;
    kids: number[];
    parts: string[];
    descendants: number[];
}

interface Comment extends Omit<Item, 'parts' | 'kids' | 'descendants'> { }

const CommentsPage: React.FC = () => {
    const [item, setItem] = useState<any>();
    const [commentIds, setCommentIds] = useState<number[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const { itemId } = useParams<{ itemId: string }>();
    const pageSize = import.meta.env.VITE_APP_PAGE_SIZE || 15;

    useEffect(() => {
        const fetchCommentsIds = async () => {
            try {
                const response: any = await getItem(Number(itemId));
                setItem(response.data);
                console.log(response.data)
                setCommentIds(response.data?.kids);
            } catch (error) {
                console.error('Error fetching comment IDs', error);
                setError('Failed to fetch comments.');
            }
        };

        fetchCommentsIds();
    }, []);

    const fetchComments = async () => {

        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const start = comments.length + 1 || 0
            const end = start + pageSize;
            console.log("commentIds ", commentIds, start, end)
            const nextCommentIds = commentIds.slice(0, 10);
            console.log("nextCommentIds ", nextCommentIds)
            const commentsData = await Promise.all(
                nextCommentIds.map(async (commentId: number) => {
                    const response: any = await getItem(commentId);
                    return response.data;
                })
            );

            if (commentsData.length < nextCommentIds.length) {
                setHasMore(false);
            }

            setComments((prev) => {
                const existingIds = new Set(prev.map(comment => comment.id));
                const uniqueComments = commentsData
                    .filter(comment => !existingIds.has(comment.id))
                    .filter(comment => !comment.deleted);
                return [...prev, ...uniqueComments];
            });


        } catch (error) {
            console.error('Error fetching comments', error);
            setError('Failed to fetch comments.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [commentIds]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                !loading &&
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 400
            ) {
                fetchComments();
            }
        };

        const debounce = (func: any, delay: number) => {
            let timeoutId: any;
            return function (...args: any) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(() => {
                    func(...args);
                }, delay);
            };
        };
        const debouncedHandleScroll = debounce(handleScroll, 500);

        window.addEventListener("scroll", debouncedHandleScroll);
        return () => {
            window.removeEventListener("scroll", debouncedHandleScroll);
        };
    }, [loading]);

    return (
        <Div className="home-page">
            <div>
                {error && <p className="error-message">{error}</p>}
                {
                    <>
                        {item && <>
                            <H4 text={item.title} />
                            <Span text={item.by} />
                            <div>{formatRelative(subDays(new Date(item.time), 3), new Date(item.time))}</div>
                            <span>{item.score}</span>
                            <span className='card-badge'>{item.type}</span>
                        </>
                        }
                    </>
                }
                <div>
                    {comments.length > 0 ? (
                        <ul className='container'>
                            {comments.map((comment, index) => (
                                <li key={index}>
                                    <CommentCard comment={comment} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No comments available at the moment.</p>
                    )}
                    {loading && <p>Loading more comments...</p>}
                </div>
            </div>
        </Div>
    );
};

export default CommentsPage;
