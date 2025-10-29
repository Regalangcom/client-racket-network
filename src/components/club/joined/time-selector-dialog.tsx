// // components/time-slot-selector.tsx
// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { X, Plus, Clock } from "lucide-react";

// interface TimeSlot {
//   start_time: string;
//   end_time: string;
// }

// interface TimeSlotSelectorProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   value: TimeSlot[];
//   onChange: (slots: TimeSlot[]) => void;
// }

// // components/club/joined/time-selector-dialog.tsx

// export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
//   open,
//   onOpenChange,
//   value,
//   onChange,
// }) => {
//   const [tempSlots, setTempSlots] = useState<TimeSlot[]>(
//     value.length > 0 ? value : [{ start_time: "", end_time: "" }]
//   );

//   // ✅ ADD HELPER TO CHECK VALIDATION
//   const isSlotValid = (slot: TimeSlot) => {
//     if (!slot.start_time || !slot.end_time) return true;
//     return slot.start_time < slot.end_time;
//   };

//   const addSlot = () => {
//     if (tempSlots.length < 5) {
//       setTempSlots([...tempSlots, { start_time: "", end_time: "" }]);
//     }
//   };

//   const removeSlot = (index: number) => {
//     if (tempSlots.length > 1) {
//       setTempSlots(tempSlots.filter((_, i) => i !== index));
//     }
//   };

//   const updateSlot = (
//     index: number,
//     field: "start_time" | "end_time",
//     value: string
//   ) => {
//     const updated = [...tempSlots];
//     updated[index][field] = value;
//     setTempSlots(updated);
//   };

//   const handleSave = () => {
//     const validSlots = tempSlots.filter(
//       (slot) => slot.start_time && slot.end_time
//     );

//     if (validSlots.length === 0) {
//       alert("Please add at least one time slot");
//       return;
//     }

//     const invalidSlot = validSlots.find(
//       (slot) => slot.start_time >= slot.end_time
//     );

//     if (invalidSlot) {
//       alert("Start time must be before end time");
//       return;
//     }

//     console.log("✅ Saving valid slots:", validSlots);
//     onChange(validSlots);
//     onOpenChange(false);
//   };

//   const handleCancel = () => {
//     setTempSlots(value.length > 0 ? value : [{ start_time: "", end_time: "" }]);
//     onOpenChange(false);
//   };

//   // ✅ CHECK IF CAN SAVE
//   const canSave = tempSlots
//     .filter((slot) => slot.start_time && slot.end_time)
//     .every((slot) => slot.start_time < slot.end_time);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <Clock className="h-5 w-5" />
//             Select Time Slots
//           </DialogTitle>
//           <DialogDescription>
//             Add 1-5 time options for participants to choose from
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           {tempSlots.map((slot, index) => {
//             // ✅ CHECK IF INVALID
//             const isInvalid =
//               slot.start_time &&
//               slot.end_time &&
//               slot.start_time >= slot.end_time;

//             return (
//               <div
//                 key={index}
//                 className={`border rounded-lg p-4 space-y-3 ${
//                   isInvalid ? "bg-red-50 border-red-300" : "bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-700">
//                     Time Slot {index + 1}
//                   </span>
//                   {tempSlots.length > 1 && (
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => removeSlot(index)}
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   )}
//                 </div>

//                 <div className="flex gap-2 items-center">
//                   <div className="flex-1">
//                     <Label className="text-xs text-gray-600">Start Time</Label>
//                     <Input
//                       type="time"
//                       value={slot.start_time}
//                       onChange={(e) =>
//                         updateSlot(index, "start_time", e.target.value)
//                       }
//                       className={`w-full mt-1 ${
//                         isInvalid ? "border-red-500" : ""
//                       }`}
//                     />
//                   </div>

//                   <span className="text-gray-400 mt-6">-</span>

//                   <div className="flex-1">
//                     <Label className="text-xs text-gray-600">End Time</Label>
//                     <Input
//                       type="time"
//                       value={slot.end_time}
//                       onChange={(e) =>
//                         updateSlot(index, "end_time", e.target.value)
//                       }
//                       className={`w-full mt-1 ${
//                         isInvalid ? "border-red-500" : ""
//                       }`}
//                     />
//                   </div>
//                 </div>

//                 {/* ✅ SHOW ERROR */}
//                 {isInvalid && (
//                   <p className="text-xs text-red-500">
//                     Start time must be before end time
//                   </p>
//                 )}
//               </div>
//             );
//           })}

//           {tempSlots.length < 5 && (
//             <Button
//               type="button"
//               variant="outline"
//               onClick={addSlot}
//               className="w-full"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Add Another Time Option
//             </Button>
//           )}
//         </div>

//         <DialogFooter className="gap-2">
//           <Button type="button" variant="outline" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button
//             type="button"
//             onClick={handleSave}
//             disabled={!canSave} // ✅ DISABLE IF INVALID
//             className="bg-[#174038] hover:bg-[#083d30] text-[#E1FFA0] disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Save Time Slots
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };
