'use client';
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareInstagram, faSquareThreads } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer id="site-footer" className="footer-container">
      <div className="social-icons">
        <a
          href="https://www.instagram.com/itsbigfarl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="policy-btn">
            <FontAwesomeIcon icon={faSquareInstagram} style={{ marginRight: '8px' }} />
            Instagram
          </button>
        </a>



        <a
          href="https://www.threads.com/@itsbigfarl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="policy-btn">
            <FontAwesomeIcon icon={faSquareThreads} style={{ marginRight: '8px' }} />
            Threads
          </button>
        </a>
      </div>

      <Link href="/privacy-policy">
        <button className="policy-btn">Privacy Policy</button>
      </Link>
    </footer>
  );
}
