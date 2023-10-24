export default function Logo() {
  return (
    <div className="items-left flex w-fit flex-shrink-0 flex-col">
      <div className="flex items-center gap-2">
        <div className="h-[2px] w-full bg-slate-100" />
        <span className="font-serif text-xl font-bold tracking-tight">
          TBTS
        </span>
        <div className="h-[2px] w-full bg-slate-100" />
      </div>
      <span className="text-xs font-light tracking-tight">
        Totally better than sReality
      </span>
    </div>
  );
}
