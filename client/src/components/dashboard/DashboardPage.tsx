"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { Brain, Calendar, ChartPie, ClipboardCheck, FilePlus, FileText, Stethoscope, Timer } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";

const DashboardPage = ({ role }: { role: string }) => {
  //   const session = useSession();
  const user = useSelector((state: RootState) => state.user);

  const roleData:any = {
    patient: {
      title: "Patient Dashboard",
      subtitle: "Manage your health records and appointments easily.",
      cards: [
        { title: "Upcoming Appointments", desc: "View and manage your scheduled OPD visits.", icon: Calendar },
        { title: "Medical Documents", desc: "Access and organize your medical reports.", icon: FileText },
        { title: "AI Health Insights", desc: "Get AI-driven insights from your reports.", icon: Brain },
      ],
    },
    doctor: {
      title: "Doctor Dashboard",
      subtitle: "Manage your patients and appointments efficiently.",
      cards: [
        { title: "Today's Appointments", desc: "Check and manage today's schedule.", icon: Calendar },
        { title: "Patient Records", desc: "Access patient history and treatment details.", icon: ClipboardCheck },
        { title: "Generate Prescriptions", desc: "Quickly create and share prescriptions.", icon: FilePlus },
      ],
    },
    diagnostic_center: {
      title: "Diagnostic Center Dashboard",
      subtitle: "Manage patient records and test reports.",
      cards: [
        { title: "Check Patient Record", desc: "View past test reports and diagnoses.", icon: ClipboardCheck },
        { title: "Create New Record", desc: "Add new diagnostic reports for patients.", icon: FilePlus },
      ],
    },
    admin: {
      title: "Hospital Admin Dashboard",
      subtitle: "Oversee hospital operations and staff management.",
      cards: [
        { title: "Hospital Analytics", desc: "Get insights on hospital performance.", icon: ChartPie },
        { title: "Manage Doctors", desc: "View and update doctor details.", icon: Stethoscope },
      ],
    },
  };

  const { title, subtitle, cards } = roleData[role] || roleData.patient;
  const now = new Date();
  const date = now.getDate();
  const month = now.toLocaleString('default', { month: 'long' });
  const timeString = now.toLocaleString('en-US', { 
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <>
    <div className="space-y-6">

      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <div className="relative bg-primary/20 border border-primary/30 p-4 rounded-xl h-44 w-1/2">
        <h2 className="font-semibold text-2xl">
          Good Day, <span className="capitalize font-bold">{user.name} 👋</span>
        </h2>
        <p>Here are your daily overview and key updates</p>
        <div className="bg-sidebar/55 mt-4 border border-white/30 backdrop-blur-lg w-32 p-2 rounded-lg">
          <p className="flex items-center gap-2"><Calendar size={14} />{`${month} ${date}`}</p>
          <p className="flex items-center gap-2"><Timer size={14} />{`${timeString}`}</p>
        </div>
        <Image src="/assets/dashboarddineshdocs.svg" width={200} height={100} alt="dinesh" className="absolute bottom-0 right-0" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card:any, index:any) => (
          <Card key={index} className="shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer">
            <CardHeader className="flex gap-4">
              <card.icon className="w-10 h-10 text-primary p-2 bg-primary/10 rounded-lg" />
              <CardTitle className="text-lg">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">{card.desc}</CardContent>
          </Card>
        ))}
      </div>
        </div>
    </>
  );
};

export default DashboardPage;
