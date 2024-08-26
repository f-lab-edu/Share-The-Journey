const NextArrow = () => {
  return (
    <svg
      width="25"
      height="20"
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.59 19.9641C11.5888 19.9641 10.6462 19.5741 9.93875 18.8653C9.23125 18.1566 8.83875 17.2141 8.84 16.2116C8.84 15.2791 9.17875 14.9641 9.795 13.7141H3.75C1.6825 13.7141 0 12.0303 0 9.96406C0 7.89781 1.6825 6.21406 3.75 6.21406H9.795C9.1775 4.96406 8.84 4.64531 8.84 3.71281C8.8389 3.2201 8.93556 2.73207 9.12437 2.27698C9.31319 1.82189 9.59042 1.40877 9.94 1.06156C11.355 -0.353438 13.825 -0.354687 15.2413 1.06281L24.1425 9.96406L15.2413 18.8653C14.8939 19.2147 14.4808 19.4917 14.0257 19.6803C13.5706 19.8689 13.0826 19.9653 12.59 19.9641ZM3.75 8.71406C3.42815 8.72846 3.12426 8.86645 2.9016 9.09929C2.67893 9.33213 2.55467 9.64189 2.55467 9.96406C2.55467 10.2862 2.67893 10.596 2.9016 10.8288C3.12426 11.0617 3.42815 11.1997 3.75 11.2141H15.8225L11.7062 15.3303C11.4721 15.5644 11.3404 15.8818 11.34 16.2128C11.34 16.5491 11.47 16.8616 11.7062 17.0978C11.9442 17.3254 12.2608 17.4523 12.59 17.4523C12.9192 17.4523 13.2358 17.3254 13.4737 17.0978L20.6075 9.96406L13.4737 2.83031C13.2358 2.60277 12.9192 2.47578 12.59 2.47578C12.2608 2.47578 11.9442 2.60277 11.7062 2.83031C11.4721 3.06437 11.3404 3.38175 11.34 3.71281C11.34 4.04781 11.47 4.36156 11.7062 4.59781L15.8225 8.71406H3.75Z"
        fill="black"
      />
    </svg>
  );
};

const PrevArrow = () => {
  return (
    <svg
      width="25"
      height="21"
      viewBox="0 0 25 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.66 20.25C11.1674 20.2513 10.6794 20.1548 10.2244 19.9662C9.76927 19.7776 9.35611 19.5006 9.00879 19.1513L0.107544 10.25L9.00879 1.34877C10.425 -0.0687304 12.895 -0.0687304 14.3113 1.34877C15.0188 2.05377 15.41 2.99502 15.41 3.99752C15.41 4.93002 15.0725 5.81127 14.455 6.50002H20.5C22.5675 6.50002 24.25 8.18252 24.25 10.25C24.25 12.3175 22.5675 14 20.5 14H14.455C15.0713 14.6863 15.41 15.565 15.41 16.4975C15.4118 16.9908 15.3156 17.4795 15.127 17.9352C14.9384 18.391 14.6611 18.8048 14.3113 19.1525C13.9639 19.5016 13.5507 19.7784 13.0956 19.9668C12.6405 20.1552 12.1526 20.2514 11.66 20.25ZM3.64254 10.25L10.7763 17.3838C11.0143 17.6113 11.3308 17.7383 11.66 17.7383C11.9893 17.7383 12.3058 17.6113 12.5438 17.3838C12.78 17.1475 12.91 16.8325 12.91 16.4988C12.91 16.165 12.78 15.8525 12.5463 15.6175L8.42754 11.5H20.5C20.8219 11.4856 21.1258 11.3476 21.3484 11.1148C21.5711 10.8819 21.6954 10.5722 21.6954 10.25C21.6954 9.92785 21.5711 9.61809 21.3484 9.38525C21.1258 9.1524 20.8219 9.01442 20.5 9.00002H8.42754L12.5438 4.88377C12.6603 4.76814 12.7528 4.63061 12.816 4.47909C12.8792 4.32758 12.9117 4.16506 12.9119 4.0009C12.912 3.83675 12.8796 3.67419 12.8167 3.52258C12.7537 3.37097 12.6614 3.23331 12.545 3.11752C12.3072 2.88944 11.9905 2.762 11.6609 2.76177C11.3314 2.76154 11.0145 2.88853 10.7763 3.11627L3.64254 10.25Z"
        fill="black"
      />
    </svg>
  );
};

export { NextArrow, PrevArrow };