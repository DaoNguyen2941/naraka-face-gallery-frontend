"use client"

import { useEffect, useRef } from "react"
import FaceGallery from "@/components/FaceGallery"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { FaceSort, FaceSortOption } from "@/lib/services/interface/face"
import RankingSidebar from "./ui/RankingSidebar"
import { useFaces } from "@/app/(public)/hooks/useGetFaces"

interface FaceGalleryPageProps {
    sort?: FaceSortOption
    tags?: string[] | undefined
    showRanking?: boolean
    search?: string
    character?: string 
}

export default function FaceGalleryPage({ sort = undefined, tags = undefined, showRanking, search, character }: FaceGalleryPageProps) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFaces({ tags, sort, search, character });

    const faceList = data?.pages.flatMap((page) => page.data) ?? []
    const loadMoreRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!loadMoreRef.current) return
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage()
                }
            },
            { threshold: 1 }
        )
        observer.observe(loadMoreRef.current)
        return () => observer.disconnect()
    }, [loadMoreRef, hasNextPage, fetchNextPage])

    return (
        <div
            className={`w-full grid gap-4 ${showRanking ? "grid-cols-1 lg:grid-cols-[1fr_200px]" : "grid-cols-1"
                }`}
        >
            {/* Gallery */}
            <div>
                <FaceGallery
                    faceCodes={{
                        data: faceList,
                        meta: {
                            page: 1,
                            take: 10,
                            itemCount: faceList.length,
                            pageCount: 1,
                            hasPreviousPage: false,
                            hasNextPage: hasNextPage ?? false,
                        },
                    }}
                    loading={isLoading}
                />

                {/* scroll detect */}
                <div ref={loadMoreRef} className="h-4"></div>
                {isFetchingNextPage && (
                    <div className="flex justify-center py-4">
                        <LoadingSpinner />
                    </div>
                )}
            </div>

            {/* Ranking */}
            {showRanking && <RankingSidebar />}
        </div>

    )
}
