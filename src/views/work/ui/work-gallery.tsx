"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@shared/lib";

import { ROW_GAP, layoutRows } from "../model/layout-rows";

import type { WorkImage, WorkLayout } from "../model/works";

const tones = [
    "bg-zinc-200 dark:bg-zinc-800",
    "bg-zinc-300 dark:bg-zinc-700",
    "bg-neutral-200 dark:bg-neutral-800",
    "bg-stone-200 dark:bg-stone-800",
];

export function WorkGallery({
    images,
    layout = "tiles",
}: {
    images: WorkImage[];
    layout?: WorkLayout;
}) {
    const t = useTranslations("Work");
    const frameRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const activeImage = activeIndex === null ? null : images[activeIndex];
    const isTiles = layout === "tiles";
    const targetHeight = width < 720 ? (isTiles ? 156 : 180) : isTiles ? 240 : 320;
    const rows = layoutRows(images, width, targetHeight);

    useEffect(() => {
        if (activeIndex === null) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActiveIndex(null);
            }

            if (event.key === "ArrowRight") {
                setActiveIndex((current) =>
                    current === null ? current : (current + 1) % images.length,
                );
            }

            if (event.key === "ArrowLeft") {
                setActiveIndex((current) =>
                    current === null ? current : (current - 1 + images.length) % images.length,
                );
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [activeIndex, images.length]);

    useLayoutEffect(() => {
        const frame = frameRef.current;

        if (!frame) {
            return;
        }

        const updateWidth = () => {
            setWidth((current) => {
                const next = frame.clientWidth;

                return current === next ? current : next;
            });
        };
        const observer = new ResizeObserver(updateWidth);

        updateWidth();
        observer.observe(frame);

        return () => observer.disconnect();
    }, [images.length]);

    if (images.length === 0) {
        return null;
    }

    return (
        <>
            <div
                ref={frameRef}
                className={cn("flex w-full min-w-0 max-w-[1400px] flex-col")}
                style={{ gap: ROW_GAP }}
            >
                {rows.map((row) => (
                    <div key={row[0].id} className={cn("flex")} style={{ gap: ROW_GAP }}>
                        {row.map((image) => {
                            const index = images.findIndex((item) => item.id === image.id);

                            return (
                                <button
                                    key={image.id}
                                    type="button"
                                    className={cn(
                                        "group relative z-0 block shrink-0 cursor-pointer",
                                        isTiles && "hover:z-10",
                                    )}
                                    style={{
                                        width: image.displayWidth,
                                        height: image.displayHeight,
                                    }}
                                    aria-label={t("Open photo", { index: index + 1 })}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <span
                                        className={cn(
                                            "relative block size-full overflow-hidden",
                                            tones[index % tones.length],
                                            isTiles
                                                ? "origin-center transition-transform duration-200 ease-out group-hover:scale-105"
                                                : "transition-opacity duration-200 group-hover:opacity-80",
                                        )}
                                    >
                                        {image.src ? (
                                            <Image
                                                src={image.src}
                                                alt=""
                                                fill
                                                sizes={`${Math.round(image.displayWidth)}px`}
                                                className={cn("object-cover")}
                                            />
                                        ) : null}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
            {activeImage ? (
                <div
                    className={cn(
                        "fixed inset-0 z-80 flex items-center justify-center bg-[#0b0b0b]",
                    )}
                    role="dialog"
                    aria-modal="true"
                    aria-label={t("Open photo", { index: (activeIndex ?? 0) + 1 })}
                    onClick={() => setActiveIndex(null)}
                >
                    <button
                        type="button"
                        className={cn(
                            "absolute top-4 right-4 cursor-pointer px-2 text-2xl text-white/70",
                        )}
                        aria-label={t("Close")}
                        onClick={() => setActiveIndex(null)}
                    >
                        ×
                    </button>
                    <button
                        type="button"
                        className={cn(
                            "absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer px-3 text-3xl text-white/70",
                        )}
                        aria-label={t("Previous")}
                        onClick={(event) => {
                            event.stopPropagation();
                            setActiveIndex((current) => {
                                if (current === null) {
                                    return current;
                                }

                                return (current - 1 + images.length) % images.length;
                            });
                        }}
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        className={cn(
                            "absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer px-3 text-3xl text-white/70",
                        )}
                        aria-label={t("Next")}
                        onClick={(event) => {
                            event.stopPropagation();
                            setActiveIndex((current) => {
                                if (current === null) {
                                    return current;
                                }

                                return (current + 1) % images.length;
                            });
                        }}
                    >
                        ›
                    </button>
                    <div
                        className={cn("relative max-h-[86vh] max-w-[86vw]")}
                        style={{
                            aspectRatio: `${activeImage.width} / ${activeImage.height}`,
                            height: "86vh",
                        }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        {activeImage.src ? (
                            <Image
                                src={activeImage.src}
                                alt=""
                                fill
                                sizes="86vw"
                                className={cn("object-contain")}
                            />
                        ) : (
                            <div className={cn("size-full bg-zinc-800")} />
                        )}
                    </div>
                    <p
                        className={cn(
                            "absolute bottom-5 font-sans text-xs tracking-wide text-white/70",
                        )}
                    >
                        {t("Count", {
                            current: (activeIndex ?? 0) + 1,
                            total: images.length,
                        })}
                    </p>
                </div>
            ) : null}
        </>
    );
}
