import { Component } from "@angular/core"

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent {
  teamMembers = [
    {
      name: "John Smith",
      position: "CEO & Founder",
      bio: "John has over 15 years of experience in the car rental industry and founded VROOM with a vision to revolutionize the way people rent cars.",
      image: "assets/images/team-1.jpg",
    },
    {
      name: "Sarah Johnson",
      position: "Operations Manager",
      bio: "Sarah ensures that all our operations run smoothly, from vehicle maintenance to customer service, providing the best experience for our clients.",
      image: "assets/images/team-2.jpg",
    },
    {
      name: "Michael Brown",
      position: "Fleet Manager",
      bio: "Michael oversees our diverse fleet of vehicles, ensuring they are well-maintained and up-to-date with the latest models and features.",
      image: "assets/images/team-3.jpg",
    },
    {
      name: "Emily Davis",
      position: "Customer Relations",
      bio: "Emily leads our customer service team, dedicated to providing exceptional support and ensuring customer satisfaction at every step.",
      image: "assets/images/team-4.jpg",
    },
  ]
}

