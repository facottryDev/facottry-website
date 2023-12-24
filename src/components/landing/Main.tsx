'use client'
import { useEffect, useState } from 'react'
import { axios_instance } from "@/lib/helpers"
import ContactForm from "../common/ContactForm"
import { Hero } from "./Hero"
import NavBar from "./NavBar"

export const LandingPage = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const isAuth = async () => {
      try {
        await axios_instance.get('/');
        setIsLoggedin(true);
      } catch (error: any) {
        console.log(error);
      }
    }

    isAuth();
  }, [])

  return (
    <div className="bg-white dark:bg-darkblue300">
      <div className="bg-bgblue dark:bg-darkblue py-8 px-8">
        <NavBar isLoggedin={isLoggedin} />

        <section id="about">
          <Hero isLoggedin={isLoggedin} />
        </section>
      </div>

      <section id="contact" className="mt-10 py-8 px-8">
        <ContactForm />
      </section>
    </div>
  )
}