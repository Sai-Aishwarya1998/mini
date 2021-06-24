import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";

import { ThemeProvider } from "styled-components";


const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#EF6C00",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#EF6C00",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};
const config = {
  floating: true,
  botDelay: 2000,
};

class ChatBotComponent extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={[
            {
              id: "intro",
              message:
                "Hey there! Good to see you here.I am Spectar- a chatbot for MeetHub.",
              trigger: "greet",
            },
            {
              id: "greet",
              message: "What is your name?",
              trigger: "name",
            },
            {
              id: "name",
              user: true,
              validator: (value) => {
                if (/^[A-Za-z][A-Za-z]+([A-Za-z][A-Za-z]+)*/.test(value)) {
                  return true;
                } else {
                  return "Please enter the valid name.";
                }
              },
              trigger: "2",
            },
            {
              id: "2",
              message: "Hi {previousValue}, Glad to know you !!",
              trigger: "3",
            },
            {
              id: "3",
              message: "Are you here for a meeting?",
              trigger: "convenor",
            },
            {
              id: "convenor",
              options: [
                { value: "Yes", label: "Yes", trigger: "yes-response" },
                { value: "No", label: "No", trigger: "13" },
              ],
            },
            {
              id: "yes-response",
              message: "Great!",
              trigger: "5",
            },
            {
              id: "13",
              message: "goodbye",
              trigger: "7",
            },
            {
              id: "7",
              message: "Have a great day !!",
              end: true,
            },
            {
              id: "5",
              message: "Which location do you prefer for meeting?",
              trigger: "location",
            },
            {
              id: "location",
              options: [
                { value: "Pune", label: "Pune", trigger: "punelocation" },
                { value: "Nagpur", label: "Nagpur", trigger: "nagpurlocation" },
                {
                  value: "Hyderabad",
                  label: "Hyderabad",
                  trigger: "hyderabadloc",
                },
                { value: "Goa", label: "Goa", trigger: "goaloc" },
                {
                  value: "Bangalore",
                  label: "Bangalore",
                  trigger: "bangaloreloc",
                },
              ],
            },
            {
              id: "punelocation",
              message: "Great!You have chosen this location:{previousValue}",
              trigger: "10",
            },
            {
              id: "nagpurlocation",
              message: "Great!You have chosen this location:{previousValue}",
              trigger: "8",
            },
            {
              id: "hyderabadloc",
              message: "Great!You have chosen this location:{previousValue}",
              trigger: "8",
            },
            {
              id: "goaloc",
              message: "Great!You have chosen this location:{previousValue}",
              trigger: "8",
            },
            {
              id: "bangaloreloc",
              message: "Great!You have chosen this location:{previousValue}",
              trigger: "8",
            },
            {
              id: "8",
              message: "Please follow the below steps for booking.",
              trigger: "9",
            },
            {
              id: "9",
              message:
                "Login to MeetHub > select the city,location,date > select CheckIn and Checkout time > select the room capacity > Check availability.You can choose the meeting room according to the requirement and availabilty",
              trigger: "14",
            },

            {
              id: "10",
              message: "Which one are you looking for?",
              trigger: "11",
            },
            {
              id: "11",
              message:
                "In Pune,we have meeting rooms available in these following places:",
              trigger: "12",
            },
            {
              id: "12",
              options: [
                { value: "PT", label: "PT", trigger: "pt" },
                { value: "HJ", label: "HJ", trigger: "hj" },
              ],
            },
            {
              id: "pt",
              message:
                "OK !,in {previousValue} we have the following meeting rooms.1)AR 2)PG",
              trigger: "8",
            },
            {
              id: "hj",
              message:
                "OK !,in {previousValue} we have the following meeting rooms.1)PT 2)HJ",
              trigger: "8",
            },
            {
              id: "14",
              options: [
                { value: "Ok", label: "OK", trigger: "13" },
                { value: "Nothanks", label: "No Thanks!", trigger: "13" },
              ],
            },
          ]}
          {...config}
        />
      </ThemeProvider>
    );
  }
}

export default ChatBotComponent;
