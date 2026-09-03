const cardContainer = document.querySelector("#card-container");

if (cardContainer) {
    const cards = [...cardContainer.querySelectorAll(".card")];
    let frameId;
    let previousWidth = 0;

    const layoutCards = () => {
        const containerStyles = getComputedStyle(cardContainer);
        const paddingLeft = parseFloat(containerStyles.paddingLeft);
        const paddingRight = parseFloat(containerStyles.paddingRight);
        const paddingTop = parseFloat(containerStyles.paddingTop);
        const paddingBottom = parseFloat(containerStyles.paddingBottom);
        const columnGap = parseFloat(containerStyles.columnGap) || 0;
        const rowGap = parseFloat(containerStyles.rowGap) || 0;
        const availableWidth =
            cardContainer.clientWidth - paddingLeft - paddingRight;
        const minimumCardWidth = Math.min(400, window.innerWidth * 0.9);
        const columnCount = Math.max(
            1,
            Math.floor(
                (availableWidth + columnGap) /
                    (minimumCardWidth + columnGap),
            ),
        );
        const cardWidth =
            (availableWidth - columnGap * (columnCount - 1)) / columnCount;
        const columnHeights = Array(columnCount).fill(paddingTop);

        cards.forEach((card) => {
            card.style.width = `${cardWidth}px`;
        });

        cards.forEach((card) => {
            const shortestColumn = columnHeights.indexOf(
                Math.min(...columnHeights),
            );
            const x =
                paddingLeft + shortestColumn * (cardWidth + columnGap);
            const y = columnHeights[shortestColumn];

            card.style.transform = `translate(${x}px, ${y}px)`;
            columnHeights[shortestColumn] += card.offsetHeight + rowGap;
        });

        const tallestColumn = Math.max(...columnHeights);
        cardContainer.style.height = `${tallestColumn - rowGap + paddingBottom}px`;
    };

    const scheduleLayout = () => {
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(layoutCards);
    };

    cardContainer.classList.add("masonry-ready");
    scheduleLayout();

    const resizeObserver = new ResizeObserver(([entry]) => {
        const width = entry.contentRect.width;

        if (width !== previousWidth) {
            previousWidth = width;
            scheduleLayout();
        }
    });

    resizeObserver.observe(cardContainer);
    document.fonts?.ready.then(scheduleLayout);
}
