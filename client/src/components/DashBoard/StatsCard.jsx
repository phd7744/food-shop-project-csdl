export default function StatsCard({icon, value, title}){
    return(
       <div className="bg-white flex items-center space-x-4 h-24 px-6 rounded-xl shadow">
          <img
            src={icon}
            alt="Customer Icon"
            className="w-16 h-16 bg-gray-200 rounded-2xl p-3"
          />
          <div>
            <span className="font-bold text-3xl">{value}</span>
            <p className="text-gray-400 text-xs font-bold">TOTAL {title}</p>
          </div>
        </div>
    )
}