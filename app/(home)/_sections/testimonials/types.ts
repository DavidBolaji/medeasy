export interface Testimonial {
  id: string;
  title: string;
  text: string;
  user: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  };
}
