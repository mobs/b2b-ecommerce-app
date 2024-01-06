import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPinterestP } from "react-icons/fa";
import { GrCertificate, GrNotes } from "react-icons/gr";
import { IoIosPeople } from "react-icons/io";
import { IoHappyOutline } from "react-icons/io5";

import {
    digitalPrinting,
    cont1,
    offset1,
    digital1,
  } from "./Images"

export const features = [
    {
        title: "Designing Services",
        content: "Our Professional graphic designing that provides innovative and customized visual creative solutions to help bussinesses.",
        image: digitalPrinting
    },
    {
        title: "Digital Printing",
        content: "Our Digital Printing services that guarantee precision, high resolution, and top quality finishing.",
        image: digital1
    },
    {
        title: "Continuous Form Printing",
        content: "Our Printing Press offers ultimate quality and solutions in your all computer forms needs.",
        image: cont1
    },
    {
        title: "Offset Printing",
        content: "Best Quality Offset Prints and Products at the most cost-effective rates.",
        image: offset1
    }
]

export const socials = [
    {
        title: "Facebook",
        link: "https://www.facebook.com",
        icon: FaFacebookF
    },
    {
        title: "Instagram",
        link: "https://www.instagram.com",
        icon: FaInstagram
    },
    {
        title: "Twitter / X",
        link: "https://www.twitter.com",
        icon: FaTwitter
    },
    {
        title: "Youtube",
        link: "https://www.youtube.com",
        icon: FaYoutube
    },
    {
        title: "Pintrest",
        link: "https://www.pinterest.com",
        icon: FaPinterestP
    },
]

export const storeDetails = [
    {
        title: "+ Projects Done",
        num: 5000,
        inc: 250,
        icon: GrNotes
    },
    {
        title: "+ Happy Customers",
        num: 3000,
        inc: 150,
        icon: IoHappyOutline
    },
    {
        title: "+ Experts Team",
        num: 85,
        inc: 5,
        icon: IoIosPeople
    },
    {
        title: "+ Years of Experience",
        num: 30,
        inc: 2,
        icon: GrCertificate
    },
]