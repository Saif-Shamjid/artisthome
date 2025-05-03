// OrderStatusTimeline.jsx
import {
  FiShoppingBag,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

const OrderStatusTimeline = ({ statusSteps }) => {
  const icons = {
    "Order Placed": FiShoppingBag,
    Processing: FiPackage,
    Shipped: FiTruck,
    Delivered: FiCheckCircle,
  };

  return (
    <div className="mb-6">
      <h4 className="font-serif text-amber-900 mb-4">Order Journey</h4>
      <div className="relative">
        <div className="absolute left-5 top-0 h-full w-0.5 bg-amber-200 rounded-full"></div>

        {statusSteps.map((step, index) => {
          const StepIcon = icons[step.name] || FiClock;

          return (
            <div key={index} className="relative pl-8 pb-6 last:pb-0">
              <div
                className={`absolute left-0 top-0 w-5 h-5 rounded-full flex items-center justify-center ${
                  step.completed
                    ? "bg-amber-600 text-white"
                    : "bg-amber-200 text-amber-600"
                }`}
              >
                <StepIcon className="w-3 h-3" />
              </div>

              <div className="flex items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <StepIcon
                      className={`w-4 h-4 mr-2 ${
                        step.completed ? "text-amber-600" : "text-amber-400"
                      }`}
                    />
                    <p
                      className={`font-medium ${
                        step.completed ? "text-amber-900" : "text-amber-800/70"
                      }`}
                    >
                      {step.name}
                    </p>
                  </div>
                  <p className="text-sm text-amber-800/70 ml-6">{step.date}</p>
                </div>
                {step.completed && (
                  <div className="flex items-center text-xs text-amber-600">
                    <FiCheckCircle className="mr-1" />
                    Completed
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTimeline;
