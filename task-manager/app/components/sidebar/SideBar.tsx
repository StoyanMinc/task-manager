import Profile from "../profile/Profile";
import StatisticChart from "../statisticChart/StatisticChart";

export default function SideBar() {
    return (
        <div className="w-[20rem] mt-[5rem] h-[calc(100%-5rem)] fixed right-0 top-0 flex flex-col bg-[#f9f9f9]">
            <Profile />
            <div className="mx-6">
                 <h3 className=" font-medium">Statistic</h3>
                <StatisticChart />
            </div>
        </div>
    )
}