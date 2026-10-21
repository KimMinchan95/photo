export const ROW_GAP = 8;

type Frame = {
    width: number;
    height: number;
};

export type PlacedFrame<T extends Frame> = T & {
    displayWidth: number;
    displayHeight: number;
};

export function layoutRows<T extends Frame>(
    items: T[],
    containerWidth: number,
    targetHeight: number,
): PlacedFrame<T>[][] {
    if (containerWidth <= 0 || items.length === 0) {
        return [];
    }

    const rows: PlacedFrame<T>[][] = [];
    let row: T[] = [];
    let rowWidth = 0;

    const widthAt = (frame: T, height: number) => height * (frame.width / frame.height);

    const place = (frames: T[], height: number): PlacedFrame<T>[] =>
        frames.map((frame) => ({
            ...frame,
            displayWidth: widthAt(frame, height),
            displayHeight: height,
        }));

    const rawWidthAt = (frames: T[], height: number) =>
        frames.reduce(
            (sum, frame, index) => sum + widthAt(frame, height) + (index > 0 ? ROW_GAP : 0),
            0,
        );

    const closeRow = (frames: T[]) => {
        const rawWidth = rawWidthAt(frames, targetHeight);
        const gaps = ROW_GAP * (frames.length - 1);
        const height = (targetHeight * (containerWidth - gaps)) / (rawWidth - gaps);
        rows.push(place(frames, height));
    };

    for (const item of items) {
        const width = widthAt(item, targetHeight);
        const nextWidth = rowWidth + width + (row.length > 0 ? ROW_GAP : 0);

        if (row.length === 0 && width >= containerWidth) {
            closeRow([item]);
            continue;
        }

        if (row.length > 0 && nextWidth > containerWidth) {
            const without = rowWidth;
            const overshoot = nextWidth - containerWidth;
            const shortfall = containerWidth - without;

            if (overshoot <= shortfall) {
                row.push(item);
                closeRow(row);
                row = [];
                rowWidth = 0;
            } else {
                closeRow(row);
                row = [item];
                rowWidth = width;
            }

            continue;
        }

        row.push(item);
        rowWidth = nextWidth;
    }

    if (row.length > 0) {
        const rawWidth = rawWidthAt(row, targetHeight);

        if (rawWidth >= containerWidth * 0.72) {
            closeRow(row);
        } else {
            rows.push(place(row, targetHeight));
        }
    }

    return rows;
}
