const AvailabilityAPI ={
    data : [
        {
            roomname: 'Room 1',
            img : 'img/tn-img-03.jpg',
            description:'description of the room',
            status:'available'
        },
        {
            roomname: 'Room 2',
            img : 'img/tn-img-02.jpg',
            description:'description of the room',
            status:'unavailable'
        },
        {
            roomname: 'Room 3',
            img : 'img/tn-img-03.jpg',
            description:'description of the room',
            status:'available'
        },
        {
            roomname: 'Room 4',
            img : 'img/tn-img-02.jpg',
            description:'description of the room',
            status:'available'
        },
        {
            roomname: 'Room 5',
            img : 'img/tn-img-03.jpg',
            description:'description of the room',
            status:'available'
        },
        {
            roomname: 'Room 6',
            img : 'img/tn-img-02.jpg',
            description:'description of the room',
            status:'unavailable'
        }
    ],

    getAll : function(){
        return this.data
    }
}

export default AvailabilityAPI;