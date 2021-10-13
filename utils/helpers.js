module.exports = {
    format_date: (date) => {
        return date.toLocalTimeString();
    },
    
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    
    // checks if the author is the signed in user
    isAuthor: (myId, authorId) => {
      return myId === authorId;
  }
};