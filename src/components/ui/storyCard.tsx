import { Link } from "react-router-dom";
import Card from "./card";
import { H4, Span } from "../tags/textTags";
import { subDays } from "date-fns";
import { formatRelative } from "date-fns/fp";

export default function StoryCard({ story }: any) {
    return (
        <Card className='text-left'>
            <span className="card-badge">{story.type}</span>
            <Link className="card-info" to={story.url} target='_blank' rel="noopener noreferrer">
                <H4 text={story.title} />
                <Span text={story.by} />
                <div>{formatRelative(subDays(new Date(story.time), 3), new Date(story.time))}</div>
                <span>{story.score}</span>
            </Link>
            <Link to={`/comments/${story.id}`}>
                <i>Comments ({story.descendants})</i>
            </Link>
        </Card>
    );
}