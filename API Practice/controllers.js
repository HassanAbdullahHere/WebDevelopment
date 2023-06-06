const getSingleBook= (req, res) => {
    
    res.status(200).json({"message":`your book is find succefully with ${req.params.id}`})
  
  }

  const getAllBook = (req, res) => {

    res.status(200).json({"message":"your book is find succefully"})
  
  }

  const addBook = (req, res) => {
 
    res.status(200).json({"message":"your book is created succefully"})
}

const deleteBookByID = (req, res) => {
   
    res.status(200).json({"message":`your book is deleted succefully with ${req.params.id}`})
  }

  const UpdateBookById = (req, res) => {
   
    res.status(200).json({"message":`your book is updated succefully with ${req.params.id}`})
  }


  module.exports ={getSingleBook,getAllBook,addBook,deleteBookByID,UpdateBookById}