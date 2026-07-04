"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from "react-icons/md";

const Footer = () => {

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      
      setTime(now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }));

      // date formet (example: Saturday, July 4, 2026)
      setDate(now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }));
    };

    updateDateTime(); 
    const timer = setInterval(updateDateTime, 1000); 

    return () => clearInterval(timer); 
  }, []);

  return (
    <footer className="w-full bg-black text-white border-t border-neutral-900 mt-auto">
      <div className="container mx-auto px-4 py-12">
        
        {/* man grid section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* brand info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold tracking-tight">
              {/* <span className="text-teal-400">Care</span>Pulse */}
              <Image
              src={"/logoo.png"}
              width={400}
              height={400}
              alt="logo"></Image>
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Your trusted partner in digital healthcare management. Providing seamless hospital experiences for both patients and doctors.
            </p>
          </div>

          {/*quick link*/}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-xs text-neutral-400">
              <li><Link href="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link href="/doctors" className="hover:text-teal-400 transition-colors">Find Doctors</Link></li>
              <li><Link href="/appointments" className="hover:text-teal-400 transition-colors">Book Appointment</Link></li>
              <li><Link href="/signin" className="hover:text-teal-400 transition-colors">Join Portal</Link></li>
            </ul>
          </div>

          {/* contact info */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">Contact Info</h4>
            <ul className="flex flex-col gap-2 text-xs text-neutral-400">
              <li className="flex items-center gap-2">
                <MdLocationOn className="text-teal-400 text-sm" />
                <span>123 Medical Avenue, Mymensingh</span>
              </li>
              <li className="flex items-center gap-2">
                <MdPhone className="text-teal-400 text-sm" />
                <span>+880 1756135199</span>
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-teal-400 text-sm" />
                <span>alomgirhosssain71@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* social and real time box*/}
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-2">Follow Us</h4>
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/AlomgirWEB" className="p-2 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-neutral-400 hover:text-teal-400 hover:border-teal-500/50 transition-all">
                  <FaFacebook size={16} />
                </a>
                <a href="https://github.com/HeyAlomgir" className="p-2 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-neutral-400 hover:text-teal-400 hover:border-teal-500/50 transition-all">
                  <FaGithub size={16} />
                </a>
                <a href="https://www.linkedin.com/in/alomgir-hossain-web/" className="p-2 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-neutral-400 hover:text-teal-400 hover:border-teal-500/50 transition-all">
                  <FaLinkedin size={16} />
                </a>
              </div>
            </div>

            {/* live watch box */}
            {time && date && (
              <div className="p-3 bg-[#0a0a0a] border border-neutral-800/80 rounded-xl flex items-center gap-3 max-w-60">
                <MdAccessTime className="text-teal-400 text-xl animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-white tracking-wider">{time}</span>
                  <span className="text-[10px] text-neutral-500 font-medium">{date}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* btn copyright section */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-medium">
          <p>© {new Date().getFullYear()} CarePulse. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;