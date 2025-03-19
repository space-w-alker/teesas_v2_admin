import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPermissionsAsync, permissionsList } from '../../../../apis/slices/rolesSlice';

const PermissionsList = () => {
    const dispatch = useDispatch();
    const permissions = useSelector(permissionsList);
    console.log(permissions.data);
    useEffect(() => {
        dispatch(listPermissionsAsync({ dispatch, token: '' }));
    }, [dispatch]);

    return (
        <div>
            <h1>Permissions</h1>
            <ul>
                {permissions?.data?.map((permission, index) => (
                    <li key={index}>{permission.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PermissionsList; 