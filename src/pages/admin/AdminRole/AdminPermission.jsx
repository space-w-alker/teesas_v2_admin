import { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { listPermissionsAsync, permissionsList, addRolePermissionAsync, getRoleDetailsAsync, roleDetails } from "../../../apis/slices/rolesSlice";

const AdminPermissions = ({ isOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { id: roleId } = useParams();
    const permissions = useSelector(permissionsList);
    const [modulePermissions, setModulePermissions] = useState({});
    const existingRoleDetails = useSelector(roleDetails);

    useEffect(() => {
        // Fetch both permissions list and role details
        dispatch(listPermissionsAsync({ dispatch, token: '' }));
        dispatch(getRoleDetailsAsync({ dispatch, id: roleId, token: '' }));
    }, [dispatch, roleId]);

    // Group permissions by module and set initial checked state
    useEffect(() => {
        if (permissions.data && existingRoleDetails?.data) {
            const existingPermissions = existingRoleDetails.data.permissions || [];

            const groupedPermissions = permissions.data.reduce((acc, permission) => {
                const { module, action, id } = permission;

                if (!acc[module]) {
                    acc[module] = {
                        create: { id: null, checked: false },
                        read: { id: null, checked: false },
                        update: { id: null, checked: false },
                        delete: { id: null, checked: false }
                    };
                }

                // Check if this permission is already assigned to the role
                const isChecked = existingPermissions.some(
                    p => p.permission?.id === id
                );

                acc[module][action] = {
                    id,
                    checked: isChecked
                };

                return acc;
            }, {});

            console.log('Grouped permissions:', groupedPermissions);
            setModulePermissions(groupedPermissions);
        }
    }, [permissions, existingRoleDetails]);

    const togglePermission = (module, action) => {
        setModulePermissions(prev => ({
            ...prev,
            [module]: {
                ...prev[module],
                [action]: {
                    ...prev[module][action],
                    checked: !prev[module][action].checked
                }
            }
        }));
    };

    const handleSubmit = () => {
        const selectedPermissionIds = Object.entries(modulePermissions)
            .flatMap(([_, actions]) =>
                Object.values(actions)
                    .filter(action => action.checked && action.id)
                    .map(action => action.id)
            );

        const data = {
            roleId: Number(roleId),
            permissionIds: selectedPermissionIds
        };

        dispatch(addRolePermissionAsync({
            dispatch,
            data,
            token: '',
            callbackFn: () => {
                navigate(`/AdminDetails/${roleId}`);
            }
        }));
    };

    return (
        <div className={`py-[7rem] lg:px-[5rem] flex flex-col gap-2 px-[10px] ${isOpen ? "lg:ml-[260px]" : ""}`}>
            <div className='flex justify-start items-center lg:gap-3'>
                <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
                <div>
                    <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
                        Home / <span className='text-black font-medium'> Admin Role Permission</span>
                    </div>
                </div>
            </div>

            <h2 className="font-bold mt-5 text-[22px] leading-[28px] text-[#2C2E32]">
                Admin Role Permission
            </h2>

            <div className="flex lg:flex-row flex-col gap-14">
                <div className="flex-1 lg:w-[70%]">
                    {Object.entries(modulePermissions).map(([moduleName, actions]) => (
                        <div key={moduleName} className="mb-6 bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4 pb-2 border-b capitalize">
                                {moduleName.replace(/_/g, ' ')}
                            </h3>
                            <div className="grid grid-cols-4 gap-4">
                                {Object.entries(actions).map(([action, details]) => (
                                    details.id && (
                                        <div key={action} className="flex items-center space-x-3">
                                            {/* <input
                                                type="checkbox"
                                                checked={details.checked}
                                                onChange={() => togglePermission(moduleName, action)}
                                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            /> */}
                                            <label className="text-sm font-medium text-gray-700 capitalize">
                                                {action}
                                            </label>
                                            <label class="inline-flex items-center cursor-pointer">
                                                <input type="checkbox"
                                                    checked={details.checked}
                                                    onChange={() => togglePermission(moduleName, action)}
                                                    class="sr-only peer" />
                                                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-400 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                                                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{details.checked ? 'Deactivate' : 'Activate'}</span>
                                            </label>

                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="users bg-white lg:mt-5 mt-5 lg:w-[30%] rounded-lg shadow-sm p-6 h-fit">
                    <h3 className="text-lg font-semibold mb-4">Summary</h3>
                    <div className="space-y-4">
                        {Object.entries(modulePermissions).map(([module, actions]) => {
                            const selectedActions = Object.entries(actions)
                                .filter(([_, details]) => details.checked)
                                .map(([action]) => action);

                            if (selectedActions.length > 0) {
                                return (
                                    <div key={module} className="p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm font-medium text-gray-600 capitalize">
                                            {module.replace(/_/g, ' ')}
                                        </span>
                                        <div className="mt-1 text-xs text-gray-500 capitalize">
                                            {selectedActions.join(', ')}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full mt-6 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Save Permissions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPermissions;
