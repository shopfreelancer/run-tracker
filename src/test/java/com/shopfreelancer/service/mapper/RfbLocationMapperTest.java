package com.shopfreelancer.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class RfbLocationMapperTest {

    private RfbLocationMapper rfbLocationMapper;

    @BeforeEach
    public void setUp() {
        rfbLocationMapper = new RfbLocationMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(rfbLocationMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(rfbLocationMapper.fromId(null)).isNull();
    }
}
