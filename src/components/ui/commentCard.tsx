import { Link } from "react-router-dom";
import Card from "./card";
import { H4 } from "../tags/textTags";
import { subDays } from "date-fns";
import { formatRelative } from "date-fns/fp";

export default function CommentCard({ comment }: any) {
    return (
        <Card className='text-left fullwidth'>
            <li className=''>
                <Link to={comment.url} target='_blank' rel="noopener noreferrer">
                    {/* <span className="card-badge">{comment.type}</span> */}
                    <H4 text={comment.title} />
                    <div>{formatRelative(subDays(new Date(comment.time), 3), new Date(comment.time))}</div>
                    <div dangerouslySetInnerHTML={{ __html: comment.text }} />
                </Link>
            </li>
        </Card>
    );
}