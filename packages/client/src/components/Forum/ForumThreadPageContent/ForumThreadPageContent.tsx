import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { getPostsForTopic } from '../../../utils/backEndApi';
import { ForumPostList } from '../ForumPostList/ForumPostList';
import { ForumReply } from '../ForumReply/ForumReply';
import './ForumThreadPageContent.scss';

export const ForumThreadPageContent: FC = () => {
  const [isNewPost, setIsNewPost] = useState(false);
  const [isNewLeaf, setIsNewLeaf] = useState(false);
  const topics = useAppSelector((state) => state.forum.topics);
  const location = useLocation();
  const threadId = Number(location.hash.slice(1));
  const title = topics.rows.find((row) => row.id === threadId)?.title;
  const endRef = useRef<null | HTMLDivElement>(null);

  const [postsRaw, setPostsRaw] = useState({ count: 0, rows: [] });
  useEffect(() => {
    getPostsForTopic(threadId).then((res) => {
      setPostsRaw(res);
      if (isNewPost) {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
        setIsNewPost(false);
      }
      if (isNewLeaf) {
        setIsNewLeaf(false);
      }
    });
  }, [threadId, isNewPost, isNewLeaf]);

  const getNewPost = useCallback(() => {
    setIsNewPost(true);
  }, []);

  const getNewLeaf = useCallback(() => {
    setIsNewLeaf(true);
  }, []);

  return (
    <div className="forum-thread-page-content">
      <h3 className="forum-thread-page-content__header">{title}</h3>
      <div className="forum-thread-page-content__thread">
        {postsRaw.count > 0 && <ForumPostList getDataUP={getNewLeaf} postList={postsRaw.rows} />}
        <div ref={endRef} />
      </div>
      <ForumReply topicID={threadId} getDataUP={getNewPost} />
    </div>
  );
};
