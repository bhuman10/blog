import { useEffect } from 'react';
import Loading from './Loading';

function TagList({ tags, tagId, getTags, setTagId, offcanvasCloseBtn }) {

    useEffect(() => {
        getTags();
    }, []);

    const onTagClick = (id) => {
        setTagId(id);
        offcanvasCloseBtn.current.click();
    };

    return (
        <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
                <button className={`w-100 nav-link link-body-emphasis ${0 === tagId ? 'active' : ''}`} onClick={() => onTagClick(0)}>
                    All tags
                </button>
            </li>
            {tags ? tags.map(tag => (
                <li key={tag.id} className="nav-item">
                    <button className={`w-100 nav-link link-body-emphasis ${tag.id === tagId ? 'active' : ''}`} onClick={() => onTagClick(tag.id)}>
                        {tag.name}
                    </button>
                </li>
            )) : (
                <Loading />
            )}
        </ul>
    );
}

export default TagList;