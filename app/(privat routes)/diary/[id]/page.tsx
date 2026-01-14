import { QueryClient } from "@tanstack/react-query";
import DiaryIdClient from "./DiaryId.client";
import { dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { fetchServerDiaryById } from "@/lib/api/serverApi";

interface DiaryIdProps {
    params: Promise<{ id: string }>;
}

export default async function DiaryIdPage({ params }: DiaryIdProps) {
    const { id } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['diary', id],
        queryFn: () => fetchServerDiaryById(id),

    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DiaryIdClient />
        </HydrationBoundary>
    );
}