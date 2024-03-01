export const  getRandomColor=()=>{
    const colors = [
      "#264653", // blue
      "#2a9d8f", // teal
      "#e76f51", // red
      "#283618", // darkolive
      "#bc6c25", // brown
      "#6a040f", // maroon
      "#6d6875", // indigo
      "#6a994e", // green
      "#007f5f", // bluegreen
      "#432818", // darkbrown
      "#4d194d", // puple
      // Add more colors as needed
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    console.log("COLOR RANDOM :",colors[randomIndex]);
    return colors[randomIndex];
  }
