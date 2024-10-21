import React, { useEffect, useState } from 'react';
import { Div } from '../components/tags/containerTags';
import { getItem, getNewStories } from '../apis/hackerNewsApi';
import StoryCard from '../components/ui/storyCard';
import Button from '../components/interactive/Button';

interface Item {
    id: number;
    title: string;
    url: string;
    time: number;
    score: number;
    deleted: boolean;
    type: "job" | "story" | "comment" | "poll" | "pollopt"
    by: string;
    text: string;
    dead: boolean;
    parent: number;
    poll: string;
    kids: number[];
    parts: string[];
    descendants: number[];
}

interface Story extends Omit<Item, 'parts' | 'dead' | 'text'> { }

const Home: React.FC = () => {
    const [storyIds, setStoryIds] = useState<number[]>([]);
    const [stories, setStories] = useState<Story[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const pageSize = import.meta.env.VITE_APP_PAGE_SIZE || 15;

    useEffect(() => {
        const fetchStoriesIds = async () => {
            try {
                const response: any = await getNewStories();
                setStoryIds(response.data);
            } catch (error) {
                console.error('Error fetching story IDs', error);
                setError('Failed to fetch stories.');
            }
        };

        fetchStoriesIds();
    }, []);

    const fetchStories = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const start = stories.length + 1 || 0;
            const end = start + pageSize;
            const nextStoryIds = storyIds.slice(start, end);

            const storiesData = await Promise.all(
                nextStoryIds.map(async (storyId: number) => {
                    const response: any = await getItem(storyId);
                    return response.data;
                })
            );

            if (storiesData.length < nextStoryIds.length) {
                setHasMore(false);
            }

            setStories((prev) => {
                const existingIds = new Set(prev.map(story => story.id));
                const uniqueStories = storiesData.filter(story => !existingIds.has(story.id));
                return [...prev, ...uniqueStories];
            });

        } catch (error) {
            console.error('Error fetching stories', error);
            setError('Failed to fetch stories.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, [storyIds]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                !loading &&
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 400
            ) {
                fetchStories();
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
        <Div>
            <div>
                <div>
                    {/* <Button label='' type='button' /> */}
                </div>
                <div>
                    {stories.length > 0 ? (
                        <ul className='card-container'>
                            {stories.map((story, index) => (
                                <li key={index}>
                                    <StoryCard story={story} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No stories available at the moment.</p>
                    )}
                    {loading && <p>Loading more stories...</p>}
                </div>
            </div>
        </Div>
    );
};

export default Home;
