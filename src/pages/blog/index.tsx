// Display all posts on the index page
import { trpc } from '../../utils/trpc';
import { inferProcedureInput } from '@trpc/server';
import { NextPageWithLayout } from '../_app';
import Link from 'next/link';
import { Fragment } from 'react';
import type { AppRouter } from '~/server/routers/_app';

const IndexPage: NextPageWithLayout = () => {
  const utils = trpc.useContext();
  //get all posts
  const postsQuery = trpc.post.list.useInfiniteQuery({
    limit: 10,
  });

  return (
    <Fragment>
      <div className="container mx-auto">
        <h1 className="text-center text-4xl font-bold">All Posts</h1>
        {postsQuery.data?.pages.map((page, index) => (
          <Fragment key={page.items[0]?.id || index}>
            {page.items.map((item) => (
              <div key={item.id}>
                <h3 className="text-2xl">{item.title}</h3>
                <Link href={`/post/${item.id}`} className="text-blue-500">
                  View more
                </Link>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export default IndexPage;
