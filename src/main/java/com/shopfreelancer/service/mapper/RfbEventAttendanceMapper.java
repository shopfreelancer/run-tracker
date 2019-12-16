package com.shopfreelancer.service.mapper;

import com.shopfreelancer.domain.*;
import com.shopfreelancer.service.dto.RfbEventAttendanceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link RfbEventAttendance} and its DTO {@link RfbEventAttendanceDTO}.
 */
@Mapper(componentModel = "spring", uses = {RfbEventMapper.class, RfbUserMapper.class})
public interface RfbEventAttendanceMapper extends EntityMapper<RfbEventAttendanceDTO, RfbEventAttendance> {

    @Mapping(source = "rfbEvent.id", target = "rfbEventId")
    @Mapping(source = "rfbUser.id", target = "rfbUserId")
    RfbEventAttendanceDTO toDto(RfbEventAttendance rfbEventAttendance);

    @Mapping(source = "rfbEventId", target = "rfbEvent")
    @Mapping(source = "rfbUserId", target = "rfbUser")
    RfbEventAttendance toEntity(RfbEventAttendanceDTO rfbEventAttendanceDTO);

    default RfbEventAttendance fromId(Long id) {
        if (id == null) {
            return null;
        }
        RfbEventAttendance rfbEventAttendance = new RfbEventAttendance();
        rfbEventAttendance.setId(id);
        return rfbEventAttendance;
    }
}
