"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { signOut } from '@/actions/auth'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'

const Header = () => {

    const [userRole, setUserRole] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setUserRole(localStorage.getItem('role'));
    }, []);

    const navItems = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Features',
            link: '/#features'
        },
        {
            name: 'Appointments',
            link: '/#appointments'
        },
        {
            name: 'About Us',
            link: '/about-us'
        },
        {
            name: 'Contact Us',
            link: '/#contact'
        }
    ]

    const handleLogout = () => {
        signOut();
        toast.success('Logged out successfully!');
        window.location.reload();
    }

    const handleDashboardRedirect = () => {
        if (userRole === 'admin') {
            router.push('/dashboard/admin');
        } else if (userRole === 'doctor') {
            router.push('/dashboard/doctor');
        } else if (userRole === 'diagnostic_center') {
            router.push('/dashboard/diagnostic-center');
        } else if (userRole === 'patient') {
            router.push('/dashboard/patient');
        }
    }

  return (
    <>
    <header className='fixed w-full top-0 flex items-center gap-8 py-3 px-6 shadow bg-white/40 z-50 backdrop-blur-md'>
        <div className='container mx-auto flex items-center justify-between'>
            <Link href='/' className='rounded-full flex items-center gap-2'>
                <Image src={"/logo.png"} width={35} height={35} alt='Logo' />
                <span className='font-bold text-purple-800 text-xl'>RECURIS</span>
            </Link>
            <nav className='flex items-center gap-4 rounded-full'>
                {navItems.map((item, index) => {
                    return (    
                        <Link 
                        key={index} 
                        href={item.link}
                        className='p-2 text-gray-700 hover:text-foreground'
                        >
                        {item.name}
                        </Link>
                    )
                })}
            </nav>
        <div className='flex items-center'>
            {userRole ? 
            <div className='flex gap-2'>
                <Button variant="outline" onClick={handleDashboardRedirect}>Dashboard</Button>
                <Button variant="destructive" onClick={() => setIsDialogOpen(true)}>Logout</Button>
            </div> : <Button className='rounded-full' asChild><Link href="/login">Login</Link></Button>}
        </div>
                </div>
    </header>
    {/* 🔹 Logout Confirmation Dialog */}
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground">
                This action will log you out from your account.
            </p>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                    Logout
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</>
  )
}

export default Header