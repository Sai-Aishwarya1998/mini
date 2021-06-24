const BookingApi = {
  data: [],
  getAll: function () {
    return this.data;
  },
  setBookings : function(data){
    this.data = data
  }
};

export default BookingApi;
