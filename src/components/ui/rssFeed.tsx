import { useEffect, useState } from 'react';
import { fetchNewsByCategorie } from '../../apis/newsApi';

interface RssFeedProps {
    categories: string;
}

export default function RssFeed({categories = ""}: RssFeedProps) {
    const [newsItems, setNewsItems] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsData = await fetchNewsByCategorie(categories);
                setNewsItems(newsData?.items);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Failed to load news');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [categories]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {newsItems.length > 0 ? (
                <ul>
                    {newsItems.map((news) => (
                        <li key={news.agencyId}>
                            <h3>{news.newsTitle}</h3>
                            <p>{news.newsDescription}</p>
                            <a href={news.newsLink} target="_blank" rel="noopener noreferrer">
                                Read more
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No news available.</p>
            )}
        </div>
    );
};