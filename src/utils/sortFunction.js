const sortByDate = (array1, array2)=> {
    return new Date(array1?.postDate) - new Date(array2?.postDate);
  }

  export default sortByDate 