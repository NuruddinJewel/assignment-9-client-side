import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link href={'/'}> Home</Link></li>
                    {/* <li><Link href={'/'}> Home</Link></li>
                    <li><Link href={'/'}> Home</Link></li> */}
                </ul>
            </nav>
            <div>
                {/* <Image></Image> */}
            </div>
        </div>
    );
};

export default Navbar;