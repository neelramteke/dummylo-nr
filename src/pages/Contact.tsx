
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Squares } from "@/components/ui/squares-background";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          { email, message, site_name: 'Dummylo' }
        ]);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      setEmail("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] dark:bg-[#060606] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <Squares 
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333" 
          hoverFillColor="#222"
          className="w-full h-full"
        />
      </div>
      <Navbar />
      
      <div className="relative pt-20">
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Contact Me</h1>
            <p className="text-gray-400 mt-2">
              Feel free to reach out with any questions or feedback.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-gray-700/30">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="bg-gray-800/50 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Your message here..."
                className="min-h-[150px] bg-gray-800/50 border-gray-700"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>

      <footer className="text-center py-8 text-gray-400 mt-8">
        <p>Made with ❤️ by Datanr</p>
        <p className="text-sm mt-2">© {new Date().getFullYear()} Datanr. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
