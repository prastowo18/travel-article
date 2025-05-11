import { DataTable } from './data-table';

const DashboardComments = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid grid-cols-1">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComments;
