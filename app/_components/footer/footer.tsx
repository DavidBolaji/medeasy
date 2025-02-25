import React from 'react';
import Wrapper from '../wrapper/wrapper';
import { footerFoterLink, footerLinks } from './footerdata';
import Link from 'next/link';
import Typography from '../typography/typography';

const Footer = () => {
  return (
    <div className="bg-white border-t border-[#E4E4EF]">
      <Wrapper>
        <div className="grid grid-cols-12 gap-4 py-16 lg:px-5 md:space-y-0 space-y-4">
          {footerLinks.map((footer, idx) => (
            <div
              key={`${footer.title}_${idx}`}
              className={`${footer.span} col-span-12`}
            >
              <Typography className="font-bold mb-2 text-base">
                {footer.title}
              </Typography>
              {footer.socials.length ? (
                <div className="flex gap-8 -ml-1">
                  {footer.socials.map(({ icon: Icon, href }, ind) => (
                    <div key={`${footer.title}_${idx}_${ind}_socials`}>
                      <Link href={href}>
                        <Icon className="inline-block w-6 h-6" />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : null}
              {footer.links.length
                ? footer.links.map(({ label, href }, ind) => (
                    <Typography
                      as="span"
                      key={`${footer.title}_${idx}_${ind}_links`}
                      className="flex mb-2 text-base"
                    >
                      <Link href={href}>{label}</Link>
                    </Typography>
                  ))
                : null}
            </div>
          ))}
        </div>
      </Wrapper>
      <div className="md:h-16 md:py-1 py-10 border-t bg-white">
        <Wrapper>
          <div className="flex bg-white md:space-y-0 space-y-2 md:flex-row justify-between flex-col h-16 md:items-center">
            {/* Left Side (Index [0]) */}
            <div className="flex flex-col md:flex-row md:space-y-0 space-y-2">
              {footerFoterLink[0].map((item, index) => (
                <Link
                  key={index}
                  href={item.links}
                  className="text-black text-sm"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Right Side (Index [1]) */}
            <div className="flex bg-white pb-4 flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-2">
              {footerFoterLink[1].map((item, index) => (
                <Link
                  key={index}
                  href={item.links}
                  className="text-black text-sm"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Footer;
