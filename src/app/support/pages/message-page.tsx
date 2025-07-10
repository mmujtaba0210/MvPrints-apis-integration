import MessageSidebar from '@/app/support/components/messages/MessageSidebar';
import MessageArea from '../components/messages/MessageArea';
import Head from 'next/head';

export default function MessagesPage() {
  return (
    <>
      <Head>
        <title>Messages</title>
        <meta name="description" content="Your messages" />
      </Head>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            <MessageSidebar />
            <main className="flex-1 overflow-y-auto bg-white">
              <MessageArea />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}